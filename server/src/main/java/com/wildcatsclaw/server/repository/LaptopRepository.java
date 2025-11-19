package com.wildcatsclaw.server.repository;

import com.wildcatsclaw.server.entity.LaptopEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LaptopRepository extends JpaRepository<LaptopEntity, Long>
{
    // Find all laptops based on laptop status
    List<LaptopEntity> findByLaptopstatus(LaptopEntity.LaptopStatus laptopstatus);
}
