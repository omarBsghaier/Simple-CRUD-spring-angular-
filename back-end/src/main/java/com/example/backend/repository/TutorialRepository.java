package com.example.backend.repository;

import com.example.backend.entities.Tutorial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TutorialRepository extends JpaRepository<Tutorial, Long> {
    List<Tutorial> findByTitleContaining(String title);
    Page<Tutorial> findByTitleContaining(String title , Pageable pageable);
    List<Tutorial> findByPublished(boolean published);

}
