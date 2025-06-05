package com.dsp.otpregistration.dto;

public class RegistrationRequest {

    private String name;
    private String dob;        // yyyy-MM-dd format string
    private String regMobile;  // mobile number
    private String role;

    public RegistrationRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getRegMobile() {
        return regMobile;
    }

    public void setRegMobile(String regMobile) {
        this.regMobile = regMobile;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "RegistrationRequest{" +
                "name='" + name + '\'' +
                ", dob='" + dob + '\'' +
                ", regMobile='" + regMobile + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
