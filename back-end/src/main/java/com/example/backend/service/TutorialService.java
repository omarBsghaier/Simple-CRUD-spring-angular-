package com.example.backend.service;

import com.example.backend.entities.Tutorial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TutorialService {
    Page<Tutorial> getAllTutorials(Pageable pageable);
    Optional<Tutorial> getTutorialById(Long id);
    Tutorial createTutorial(Tutorial tutorial);
    Tutorial updateTutorial(Long id, Tutorial tutorial);
    void deleteAllTutorial();
    void deleteTutorial(Long id);
    List<Tutorial> findByTitle( String title ) ;
    List<Tutorial> findByPublished( boolean published) ;
    Page<Tutorial>findBytitlePage(String name, int page, int size);
}
