package com.wildcatsclaw.server.entity;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "tbl_schedules")
public class ScheduleEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scheduleid")
    private Long id;

    private String course;
    private String section;
    private String description;
    private String schoolyear;
    private String semester;
    private String type; // Laboratory or Lecture
    private String day;
    private LocalTime start;
    private LocalTime end;

    @ManyToOne
    @JoinColumn(name = "fk_studentid")
    private StudentEntity student;

    public ScheduleEntity() { super(); }

    public ScheduleEntity(Long id, String course, String section, String description, String schoolyear, String semester, String type, String day, LocalTime start, LocalTime end, StudentEntity student)
    {
        super();
        this.id = id;
        this.course = course;
        this.section = section;
        this.description = description;
        this.schoolyear = schoolyear;
        this.semester = semester;
        this.type = type;
        this.day = day;
        this.start = start;
        this.end = end;
        this.student = student;
    }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSchoolyear() { return schoolyear; }
    public void setSchoolyear(String schoolyear) { this.schoolyear = schoolyear; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public LocalTime getStart() { return start; }
    public void setStart(LocalTime start) { this.start = start; }

    public LocalTime getEnd() { return end; }
    public void setEnd(LocalTime end) { this.end = end; }

    public StudentEntity getStudent() { return student; }
    public void setStudent(StudentEntity student) { this.student = student; }
}
