using System.ComponentModel.DataAnnotations;

namespace ManavSevaTrust.Backend.Models;

public class Registration
{
    public int Id { get; set; }

    [Required]
    public string FullName { get; set; } = string.Empty;

    [Required]
    public string FatherName { get; set; } = string.Empty;

    [Required]
    public string DOB { get; set; } = string.Empty;

    [Required]
    public string Gender { get; set; } = string.Empty;

    [Required]
    public string Qualification { get; set; } = string.Empty;

    [Required]
    public string Address { get; set; } = string.Empty;

    [Required]
    public string Taluka { get; set; } = string.Empty;

    [Required]
    public string District { get; set; } = string.Empty;

    [Required]
    public string Pincode { get; set; } = string.Empty;

    [Required]
    public string State { get; set; } = string.Empty;

    [Required]
    public string Mobile { get; set; } = string.Empty;

    public string AlternateNumber { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Aadhaar { get; set; } = string.Empty;

    [Required]
    public string Status { get; set; } = string.Empty;

    public string SpecialSkills { get; set; } = string.Empty;
    public string WhyJoin { get; set; } = string.Empty;
    public string ProposerName { get; set; } = string.Empty;
    public string ProposerMemberId { get; set; } = string.Empty;
    public string SeconderName { get; set; } = string.Empty;
    public string SeconderMemberId { get; set; } = string.Empty;
}
