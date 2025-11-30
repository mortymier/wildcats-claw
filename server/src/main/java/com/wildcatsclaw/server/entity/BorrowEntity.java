package com.wildcatsclaw.server.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tbl_borrows")
public class BorrowEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "borrowid")
    private Long id;

    private String reason;
    private LocalDate requestdate;
    private LocalDate approvaldate;

    @Enumerated(EnumType.STRING)
    private BorrowStatus borrowstatus;

    public enum BorrowStatus
    {
        REVIEWING, APPROVED, REJECTED, RETURNED, OVERDUE
    }

    @ManyToOne
    @JoinColumn(name = "fk_studentid")
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "fk_laptopid")
    private LaptopEntity laptop;

    @ManyToOne
    @JoinColumn(name = "fk_scheduleid")
    private ScheduleEntity schedule;

    public BorrowEntity() { super(); }

    public BorrowEntity(Long id, String reason, LocalDate requestdate, LocalDate approvaldate, BorrowStatus borrowstatus, StudentEntity student, LaptopEntity laptop, ScheduleEntity schedule)
    {
        super();
        this.id = id;
        this.reason = reason;
        this.requestdate = requestdate;
        this.approvaldate = approvaldate;
        this.borrowstatus = borrowstatus;
        this.student = student;
        this.laptop = laptop;
        this.schedule = schedule;
    }

    @PrePersist
    public void onCreate()
    {
        borrowstatus = BorrowStatus.REVIEWING;
        requestdate = LocalDate.now();
    }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public LocalDate getRequestdate() { return requestdate; }
    public void setRequestdatedate(LocalDate requestdate) { this.requestdate= requestdate; }

    public LocalDate getApprovaldate() { return approvaldate; }
    public void setApprovaldate(LocalDate approvaldate) { this.approvaldate = approvaldate; }

    public BorrowStatus getBorrowstatus() { return borrowstatus; }
    public void setBorrowstatus(BorrowStatus borrowstatus) { this.borrowstatus = borrowstatus; }

    public StudentEntity getStudent() { return student; }
    public void setStudent(StudentEntity student) { this.student = student; }

    public LaptopEntity getLaptop() { return laptop; }
    public void setLaptop(LaptopEntity laptop) { this.laptop = laptop; }

    public ScheduleEntity getSchedule() { return schedule; }
    public void setSchedule(ScheduleEntity schedule) { this.schedule = schedule; }
}
