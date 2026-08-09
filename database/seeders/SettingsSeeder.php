<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'hero_title' => ['मानव सेवा केंद्र', 'Hero heading'],
            'hero_location' => ['मावळ, पुणे', 'Hero location line'],
            'hero_description' => [
                '"मानव सेवा हीच ईश्वर सेवा" या भावनेने कार्यरत मानव सेवा केंद्र अंतर्गत चार उपक्रम/महाविद्यालये संकल्पित आहेत — स्कूल ऑफ इकॉनॉमिक्स, कॉम्प्युटर सायन्स व आयटी, स्कूल ऑफ सायकॉलॉजी आणि ग्रंथालय आणि संशोधन केंद्र — हे सर्व एका १ एकर कॅम्पसवर उभारले जाणार आहेत.',
                'Hero description paragraph',
            ],
            'mission_text' => [
                '"मानव सेवा हीच ईश्वर सेवा" या भावनेने प्रेरित होऊन, ज्ञान, संशोधन आणि समाजसेवा यांच्या माध्यमातून समाजातील सर्व घटकांपर्यंत दर्जेदार शिक्षण व वाचन संस्कृती पोहोचवणे हे मानव सेवा केंद्राचे ध्येय आहे. गुणवत्तापूर्ण शिक्षण, कौशल्य विकास आणि संस्काराचे आदर्श केंद्र उभारण्याचा आमचा संकल्प आहे.',
                'Mission statement paragraph',
            ],
            'address' => [
                'आय-४४, इलाईट ग्रीन एकर, महिंद्रा कंपनीसमोर, टाकवे रोड, जांभूळ, तालुका मावळ, जिल्हा पुणे - ४१२१०६',
                'Office address',
            ],
            'reg_trust_number' => ['F-20543', 'Sarwajanik Vishwasta Sanstha registration no.'],
            'reg_society_number' => ['Maha-1051/2013', 'Society registration no.'],
            'life_membership_amount' => ['10000', 'Fixed life membership fee (INR)'],
            'donation_suggested_amounts' => ['500,1000,2100,5000,10000', 'Quick-select donation amounts (comma separated, INR)'],
        ];

        foreach ($defaults as $key => [$value, $label]) {
            Setting::query()->updateOrCreate(['key' => $key], ['value' => $value, 'label' => $label]);
        }
    }
}
