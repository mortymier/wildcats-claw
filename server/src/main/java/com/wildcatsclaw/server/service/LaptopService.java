package com.wildcatsclaw.server.service;

import com.wildcatsclaw.server.entity.LaptopEntity;
import com.wildcatsclaw.server.repository.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LaptopService
{
    @Autowired
    private LaptopRepository laptopRepository;

    // ADD NEW LAPTOP
    @SuppressWarnings("null")
    public LaptopEntity addLaptop(LaptopEntity laptop)
    {
        return laptopRepository.save(laptop);
    }

    // GET ALL LAPTOPS
    public List<LaptopEntity> getAllLaptops()
    {
        return laptopRepository.findAll();
    }

    // GET ALL LAPTOPS BASED ON STATUS
    public List<LaptopEntity> getAllLaptopsByStatus(LaptopEntity.LaptopStatus laptopstatus)
    {
        return laptopRepository.findByLaptopstatus(laptopstatus);
    }
}
