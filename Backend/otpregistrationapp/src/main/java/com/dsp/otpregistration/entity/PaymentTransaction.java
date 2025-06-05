package com.dsp.otpregistration.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
public class PaymentTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private String status;
    private String transactionId;
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "registration_id")
    private RegistrationMaster registration;
}