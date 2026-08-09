<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class RazorpayService
{
    private ?string $keyId;

    private ?string $keySecret;

    public function __construct()
    {
        $this->keyId = config('services.razorpay.key');
        $this->keySecret = config('services.razorpay.secret');
    }

    public function isConfigured(): bool
    {
        return filled($this->keyId) && filled($this->keySecret);
    }

    public function keyId(): ?string
    {
        return $this->keyId;
    }

    /**
     * Creates a Razorpay order for the given amount (in rupees) and returns
     * the decoded order payload (including its Razorpay order id).
     */
    public function createOrder(float $amountInRupees, string $receipt, array $notes = []): array
    {
        if (! $this->isConfigured()) {
            throw new RuntimeException('Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.');
        }

        $response = Http::withBasicAuth($this->keyId, $this->keySecret)
            ->asJson()
            ->post('https://api.razorpay.com/v1/orders', [
                'amount' => (int) round($amountInRupees * 100),
                'currency' => 'INR',
                'receipt' => $receipt,
                'notes' => $notes,
            ]);

        if ($response->failed()) {
            Log::error('Razorpay order creation failed', ['response' => $response->body()]);
            throw new RuntimeException('Unable to create Razorpay order.');
        }

        return $response->json();
    }

    /**
     * Verifies the signature Razorpay sends back after a successful checkout.
     */
    public function verifySignature(string $orderId, string $paymentId, string $signature): bool
    {
        if (! $this->isConfigured()) {
            return false;
        }

        $expected = hash_hmac('sha256', "{$orderId}|{$paymentId}", $this->keySecret);

        return hash_equals($expected, $signature);
    }
}
