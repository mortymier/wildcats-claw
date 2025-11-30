package com.wildcatsclaw.server.repository;

import com.wildcatsclaw.server.entity.BorrowEntity;
import com.wildcatsclaw.server.entity.LaptopEntity;
import com.wildcatsclaw.server.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BorrowRepository extends JpaRepository<BorrowEntity, Long>
{
    // Find all borrow records with a specific borrow status
    List<BorrowEntity> findByBorrowstatus(BorrowEntity.BorrowStatus borrowstatus);

    // Find all borrow records from a specific student with a specific borrow status
    List<BorrowEntity> findByStudentAndBorrowstatus(StudentEntity student, BorrowEntity.BorrowStatus borrowstatus);

    // Find specific borrow by student and laptop
    Optional<BorrowEntity> findByStudentAndLaptop(StudentEntity student, LaptopEntity laptop);

    // Find specific borrow by laptop
    Optional<BorrowEntity> findByLaptop(LaptopEntity laptop);

    // Find specific borrow by laptop and borrow status
    Optional<BorrowEntity> findByLaptopAndBorrowstatus(LaptopEntity laptop, BorrowEntity.BorrowStatus borrowstatus);
}
