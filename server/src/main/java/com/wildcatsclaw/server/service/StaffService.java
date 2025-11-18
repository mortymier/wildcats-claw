package com.wildcatsclaw.server.service;

import com.wildcatsclaw.server.entity.StaffEntity;
import com.wildcatsclaw.server.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class StaffService
{
    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER STAFF
    public StaffEntity registerStaff(StaffEntity staff)
    {
        // Hash raw password before saving
        staff.setPassword(passwordEncoder.encode(staff.getPassword()));
        return staffRepository.save(staff);
    }

    // LOGIN STAFF
    public Optional<StaffEntity> loginStaff(String email, String rawPassword)
    {
        Optional<StaffEntity> staff = staffRepository.findByEmail(email);

        if(staff.isPresent())
        {
            String hashedPassword = staff.get().getPassword();

            if(passwordEncoder.matches(rawPassword, hashedPassword))
                return staff;
        }

        // Return if invalid credentials
        return Optional.empty();
    }
}
