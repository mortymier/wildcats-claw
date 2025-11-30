package com.wildcatsclaw.server.service;

import com.wildcatsclaw.server.entity.LaptopEntity;
import com.wildcatsclaw.server.repository.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.naming.NameNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

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

    public LaptopEntity addLaptop2(String brand, String model, String ram, String cpu, String storage, double price, MultipartFile image) throws IOException
    {
        LaptopEntity laptop = new LaptopEntity();

        laptop.setBrand(brand);
        laptop.setModel(model);
        laptop.setRam(ram);
        laptop.setCpu(cpu);
        laptop.setStorage(storage);
        laptop.setPrice(price);
        laptop.setImage(image.getBytes());
        
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

    // UPDATE LAPTOP STATUS
    @SuppressWarnings({ "null", "finally" })
    public LaptopEntity updateLaptopStatus(LaptopEntity.LaptopStatus newstatus, LaptopEntity laptop)
    {
        LaptopEntity updatedLaptop = new LaptopEntity();

        try
        {
            String brand = laptop.getBrand();
            String model = laptop.getModel();
            updatedLaptop = laptopRepository.findByBrandAndModel(brand, model).get();
            updatedLaptop.setLaptopstatus(newstatus);
        }
        catch(NoSuchElementException e)
        {
            throw new NameNotFoundException("Laptop does not exist!");
        }
        finally
        {
            return laptopRepository.save(updatedLaptop);
        }
    }
}
