package com.wildcatsclaw.server.service;

import com.wildcatsclaw.server.entity.ScheduleEntity;
import com.wildcatsclaw.server.entity.StudentEntity;
import com.wildcatsclaw.server.repository.ScheduleRepository;
import com.wildcatsclaw.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService
{
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private StudentRepository studentRepository;

    // ADD NEW SCHEDULE USING STUDENT EMAIL
    public ScheduleEntity addScheduleByEmail(String email, ScheduleEntity schedule)
    {
        schedule.setStudent(studentRepository.findByEmail(email).get());
        return scheduleRepository.save(schedule);
    }

    // GET ALL SCHEDULES BELONGING TO A SPECIFIC STUDENT
    public List<ScheduleEntity> getAllSchedulesByEmail(String email)
    {
        Optional<StudentEntity> student = studentRepository.findByEmail(email);
        return scheduleRepository.findByStudent(student.get());
    }
}
