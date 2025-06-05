package com.dsp.otpregistration.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dsp.otpregistration.entity.PersonEntry;
import com.dsp.otpregistration.entity.RegistrationMaster;

public interface PersonEntryRepository extends JpaRepository<PersonEntry, Long> {

	List<PersonEntry> findByRegistration(RegistrationMaster rm);
}
