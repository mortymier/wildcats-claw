package com.wildcatsclaw.server.controller;

import com.wildcatsclaw.server.entity.LaptopEntity;
import com.wildcatsclaw.server.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/laptop")
public class LaptopController
{
    @Autowired
    private LaptopService laptopService;

    // POST: Add new laptop
    @PostMapping("/add")
    public ResponseEntity<LaptopEntity> addLaptop(@RequestBody LaptopEntity laptop)
    {
        LaptopEntity newLaptop = laptopService.addLaptop(laptop);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
        return ResponseEntity.created(location).body(newLaptop);
    }

    // GET: All laptops
    @GetMapping("/all")
    public ResponseEntity<List<LaptopEntity>> getAllLaptops()
    {
        List<LaptopEntity> laptops = laptopService.getAllLaptops();
        return ResponseEntity.ok(laptops);
    }
}
