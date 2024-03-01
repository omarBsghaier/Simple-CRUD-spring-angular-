package com.example.backend.service.implimentation;

import com.example.backend.entities.Tutorial;
import com.example.backend.repository.TutorialRepository;
import com.example.backend.service.TutorialService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class TutorialServiceImpl implements TutorialService {
    private final TutorialRepository tutorialRepository;

    @Override
    public Page<Tutorial> getAllTutorials(Pageable pageable) {
        return tutorialRepository.findAll(pageable);
    }

    @Override
    public Optional<Tutorial> getTutorialById(Long id) {
        // Check if ID is null
        if (id == null) {
            throw new IllegalArgumentException("Tutorial ID cannot be null");
        }

        // Return Optional<Tutorial> from repository directly
        return tutorialRepository.findById(id);
    }

    @Override
    public Tutorial createTutorial(Tutorial tutorial) {
        if (tutorial == null) {
            throw new IllegalArgumentException("Tutorial object cannot be null");
        }
        if (tutorial.getTitle() == null || tutorial.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Tutorial title cannot be null or empty");
        }
        if (tutorial.getDescription() == null || tutorial.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Tutorial description cannot be null or empty");
        }

        return tutorialRepository.save(tutorial);
    }

    @Override
    public Tutorial updateTutorial(Long id, Tutorial updatedTutorial) {
        Optional<Tutorial> tutorialOp = tutorialRepository.findById(id);

        if (tutorialOp.isPresent()) {
            Tutorial existingTutorial = tutorialOp.get();
            existingTutorial.setTitle(updatedTutorial.getTitle());
            existingTutorial.setDescription(updatedTutorial.getDescription());
            existingTutorial.setPublished(updatedTutorial.isPublished());

            return tutorialRepository.save(existingTutorial);
        }
        return null;
    }

    @Override
    public void deleteAllTutorial() {

        tutorialRepository.deleteAll();
    }


    @Override
    public void deleteTutorial(Long id) {
        tutorialRepository.deleteById(id);
    }

    @Override
    public List<Tutorial> findByTitle(String title) {
        if (title == null)
            return tutorialRepository.findAll();
        return tutorialRepository.findByTitleContaining(title);
    }

    public Page<Tutorial> findBytitlePage(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return tutorialRepository.findByTitleContaining(name, pageable);
    }
    @Override
    public List<Tutorial> findByPublished(boolean published) {
        return tutorialRepository.findByPublished(published);
    }
}
