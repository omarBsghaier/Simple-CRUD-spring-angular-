package com.example.backend.service;

import com.example.backend.entities.Tutorial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TutorialService {
    Page<Tutorial> getAllTutorials(Pageable pageable);
    Tutorial createTutorial(Tutorial tutorial);
    Tutorial updateTutorial(Long id, Tutorial tutorial);
    void deleteAllTutorial();
    void deleteTutorial(Long id);
}
