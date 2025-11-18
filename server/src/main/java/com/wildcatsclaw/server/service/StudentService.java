package com.wildcatsclaw.server.service;

import com.wildcatsclaw.server.entity.StudentEntity;
import com.wildcatsclaw.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class StudentService 
{
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER STUDENT
    public StudentEntity registerStudent(StudentEntity student)
    {
        // Hash raw password before saving
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return studentRepository.save(student);
    }

    // LOGIN STUDENT
    public Optional<StudentEntity> loginStudent(String email, String rawPassword)
    {
        Optional<StudentEntity> student = studentRepository.findByEmail(email);

        if(student.isPresent())
        {
            String hashedPassword = student.get().getPassword();

            if(passwordEncoder.matches(rawPassword, hashedPassword))
                return student;
        }

        // Return if invalid credentials
        return Optional.empty();
    }
}