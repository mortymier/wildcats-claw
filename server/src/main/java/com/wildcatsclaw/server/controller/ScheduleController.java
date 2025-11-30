package com.wildcatsclaw.server.controller;

import com.wildcatsclaw.server.entity.ScheduleEntity;
import com.wildcatsclaw.server.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/schedule")
public class ScheduleController
{
    @Autowired
    private ScheduleService scheduleService;

    // POST: Add new schedule using student email
    @PostMapping("/student")
    public ResponseEntity<ScheduleEntity> addScheduleByEmail(@RequestParam String email, @RequestBody ScheduleEntity schedule)
    {
        ScheduleEntity newSchedule = scheduleService.addScheduleByEmail(email, schedule);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
        return ResponseEntity.created(location).body(newSchedule);
    }

    // GET: All schedules belonging to a specific student
    @GetMapping("/student")
    public ResponseEntity<List<ScheduleEntity>> getAllSchedulesByEmail(@RequestParam String email)
    {
        List<ScheduleEntity> schedules = scheduleService.getAllSchedulesByEmail(email);
        return ResponseEntity.ok(schedules);
    }
}
