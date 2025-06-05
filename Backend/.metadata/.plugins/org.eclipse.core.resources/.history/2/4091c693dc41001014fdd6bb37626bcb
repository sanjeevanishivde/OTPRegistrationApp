package com.dsp.otpregistration.controller;

import com.dsp.otpregistration.entity.PaymentTransaction;
import com.dsp.otpregistration.entity.RegistrationMaster;
import com.dsp.otpregistration.repository.PaymentTransactionRepository;
import com.dsp.otpregistration.repository.RegistrationMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentTransactionRepository paymentRepo;

    @Autowired
    private RegistrationMasterRepository masterRepo;

    @PostMapping("/complete")
    public void completePayment(@RequestBody Map<String, String> body) {
        String mobile = body.get("mobile");
        RegistrationMaster rm = masterRepo.findByMobile(mobile).orElseThrow();

        PaymentTransaction tx = new PaymentTransaction();
        tx.setAmount(118.0);
        tx.setStatus("SUCCESS");
        tx.setTransactionId("TXN" + System.currentTimeMillis());
        tx.setTimestamp(LocalDateTime.now());
        tx.setRegistration(rm);
        paymentRepo.save(tx);

        rm.setPaymentDone(true);
        masterRepo.save(rm);
    }
}
