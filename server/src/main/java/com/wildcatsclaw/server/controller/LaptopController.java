package com.wildcatsclaw.server.controller;

import com.wildcatsclaw.server.entity.LaptopEntity;
import com.wildcatsclaw.server.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.io.IOException;
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

    @PostMapping("/add2")
    public ResponseEntity<LaptopEntity> addLaptop2
    (
        @RequestParam String brand,
        @RequestParam String model,
        @RequestParam String ram,
        @RequestParam String cpu,
        @RequestParam String storage,
        @RequestParam double price,
        @RequestParam MultipartFile image
    )
    {
        try
        {
            LaptopEntity newLaptop = laptopService.addLaptop2(brand, model, ram, cpu, storage, price, image);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
            return ResponseEntity.created(location).body(newLaptop);
        }
        catch(IOException e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET: All laptops
    @GetMapping("/all")
    public ResponseEntity<List<LaptopEntity>> getAllLaptops()
    {
        List<LaptopEntity> laptops = laptopService.getAllLaptops();
        return ResponseEntity.ok(laptops);
    }

    // PUT: Update laptop status
    @PutMapping("/status/{newstatus}")
    public ResponseEntity<LaptopEntity> updateLaptopStatus(@PathVariable LaptopEntity.LaptopStatus newstatus, @RequestBody LaptopEntity laptop)
    {
        try
        {
            LaptopEntity updatedLaptop = laptopService.updateLaptopStatus(newstatus, laptop);
            return ResponseEntity.ok(updatedLaptop);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
