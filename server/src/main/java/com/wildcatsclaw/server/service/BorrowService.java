package com.wildcatsclaw.server.service;

import com.wildcatsclaw.server.entity.BorrowEntity;
import com.wildcatsclaw.server.entity.LaptopEntity;
import com.wildcatsclaw.server.entity.ScheduleEntity;
import com.wildcatsclaw.server.entity.StudentEntity;
import com.wildcatsclaw.server.repository.BorrowRepository;
import com.wildcatsclaw.server.repository.LaptopRepository;
import com.wildcatsclaw.server.repository.ScheduleRepository;
import com.wildcatsclaw.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.naming.NameNotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BorrowService
{
    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LaptopRepository laptopRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    // ADD NEW BORROW RECORD
    public BorrowEntity addBorrowRecord(String email, String course, String type, String brand, String model, BorrowEntity borrow)
    {
        Optional<StudentEntity> student = studentRepository.findByEmail(email);
        Optional<LaptopEntity> laptop = laptopRepository.findByBrandAndModel(brand, model);
        Optional<ScheduleEntity> schedule = scheduleRepository.findByCourseAndTypeAndStudent(course, type, student.get());
        borrow.setStudent(student.get());
        borrow.setLaptop(laptop.get());
        borrow.setSchedule(schedule.get());
        return borrowRepository.save(borrow);
    }

    // GET ALL BORROW RECORDS WITH A SPECIFIC STATUS
    public List<BorrowEntity> getAllBorrowsByStatus(BorrowEntity.BorrowStatus borrowstatus)
    {
        return borrowRepository.findByBorrowstatus(borrowstatus);
    }

    // GET ALL BORROWS RECORDS FROM A SPECIFIC STUDENT WITH A SPECIFIC STATUS
    public List<BorrowEntity> getAllBorrowsByStudentAndStatus(String email, BorrowEntity.BorrowStatus borrowstatus)
    {
        Optional<StudentEntity> student = studentRepository.findByEmail(email);
        return borrowRepository.findByStudentAndBorrowstatus(student.get(), borrowstatus);
    }

    // GET BORROW BY LAPTOP BRAND, MODEL, AND BORROW STATUS
    public BorrowEntity getBorrowByLaptopAndStatus(String brand, String model, BorrowEntity.BorrowStatus borrowstatus)
    {
        Optional<LaptopEntity> laptop = laptopRepository.findByBrandAndModel(brand, model);
        return borrowRepository.findByLaptopAndBorrowstatus(laptop.get(), borrowstatus).get();
    }

    // UPDATE BORROW STATUS
    @SuppressWarnings({ "null", "finally" })
    public BorrowEntity updateBorrowStatus(BorrowEntity.BorrowStatus newstatus, BorrowEntity borrow)
    {
        BorrowEntity updatedBorrow = new BorrowEntity();

        try
        {
            StudentEntity student = studentRepository.findByEmail(borrow.getStudent().getEmail()).get();
            String brand = borrow.getLaptop().getBrand();
            String model = borrow.getLaptop().getModel();
            LaptopEntity laptop = laptopRepository.findByBrandAndModel(brand, model).get();
            updatedBorrow = borrowRepository.findByStudentAndLaptop(student, laptop).get();
            updatedBorrow.setBorrowstatus(newstatus);
            updatedBorrow.setApprovaldate(LocalDate.now());

            if(newstatus == BorrowEntity.BorrowStatus.RETURNED)
                updatedBorrow.setApprovaldate(null);
        }
        catch(NoSuchElementException e)
        {
            throw new NameNotFoundException("Borrow record does not exist");
        }
        finally
        {
            return borrowRepository.save(updatedBorrow);
        }
    }
}