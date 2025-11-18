package com.wildcatsclaw.server.controller;

import com.wildcatsclaw.server.dto.LoginRequestDTO;
import com.wildcatsclaw.server.entity.StaffEntity;
import com.wildcatsclaw.server.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/staff")
public class StaffController
{
    @Autowired
    private StaffService staffService;

    // POST: Register staff
    @PostMapping("/register")
    public ResponseEntity<StaffEntity> registerStaff(@RequestBody StaffEntity staff)
    {
        StaffEntity newStaff = staffService.registerStaff(staff);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
        return ResponseEntity.created(location).body(newStaff);
    }

    // POST: Login staff
    @PostMapping("/login")
    public ResponseEntity<StaffEntity> loginStaff(@RequestBody LoginRequestDTO request)
    {
        String email = request.getEmail();
        String password = request.getPassword();

        Optional<StaffEntity> staff = staffService.loginStaff(email, password);
        ResponseEntity response = ResponseEntity.status(401).body("Invalid email or password");

        if(staff.isPresent())
            response = ResponseEntity.ok(staff.get());

        return response;
    }
}
