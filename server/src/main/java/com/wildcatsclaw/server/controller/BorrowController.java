package com.wildcatsclaw.server.controller;

import com.wildcatsclaw.server.entity.BorrowEntity;
import com.wildcatsclaw.server.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/borrow")
public class BorrowController
{
    @Autowired
    private BorrowService borrowService;

    // POST: Add new borrow record
    @PostMapping("/add")
    public ResponseEntity<BorrowEntity> addBorrowRecord
    (
        @RequestParam String email,
        @RequestParam String course,
        @RequestParam String type,
        @RequestParam String brand,
        @RequestParam String model,
        @RequestBody BorrowEntity borrow
    )
    {
        BorrowEntity newBorrow = borrowService.addBorrowRecord(email, course, type, brand, model, borrow);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
        return ResponseEntity.created(location).body(newBorrow);
    }

    // GET: All borrow records with a specific status
    @GetMapping("/all")
    public ResponseEntity<List<BorrowEntity>> getAllBorrowsByStatus(@RequestParam BorrowEntity.BorrowStatus borrowstatus)
    {
        List<BorrowEntity> borrows = borrowService.getAllBorrowsByStatus(borrowstatus);
        return ResponseEntity.ok(borrows);
    }

    // GET: All borrow records from a specific student with a specific status
    @GetMapping("/all/student")
    public ResponseEntity<List<BorrowEntity>> getAllBorrowsByStudentAndStatus(@RequestParam String email, @RequestParam BorrowEntity.BorrowStatus borrowstatus)
    {
        List<BorrowEntity> borrows = borrowService.getAllBorrowsByStudentAndStatus(email, borrowstatus);
        return ResponseEntity.ok(borrows);
    }

    // GET: Borrow record by laptop brand, model, and borrow status
    @GetMapping("/get")
    public ResponseEntity<BorrowEntity> getBorrowByLaptopAndStatus(@RequestParam String brand, @RequestParam String model, @RequestParam BorrowEntity.BorrowStatus borrowstatus)
    {
        BorrowEntity borrow = borrowService.getBorrowByLaptopAndStatus(brand, model, borrowstatus);
        return ResponseEntity.ok(borrow);
    }

    // PUT: Update borrow status
    @PutMapping("/status/{newstatus}")
    public ResponseEntity<BorrowEntity> updateBorrowStatus(@PathVariable BorrowEntity.BorrowStatus newstatus, @RequestBody BorrowEntity borrow)
    {
        try
        {
            BorrowEntity updatedBorrow = borrowService.updateBorrowStatus(newstatus, borrow);
            return ResponseEntity.ok(updatedBorrow);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
