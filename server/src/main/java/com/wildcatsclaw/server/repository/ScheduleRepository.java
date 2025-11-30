package com.wildcatsclaw.server.repository;

import com.wildcatsclaw.server.entity.ScheduleEntity;
import com.wildcatsclaw.server.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long>
{
    // Find all schedules belonging to a specific student
    List<ScheduleEntity> findByStudent(StudentEntity student);

    // Find schedule by course, type (Laboratory or Lecture), and student
    Optional<ScheduleEntity> findByCourseAndTypeAndStudent(String course, String type, StudentEntity student);
}
