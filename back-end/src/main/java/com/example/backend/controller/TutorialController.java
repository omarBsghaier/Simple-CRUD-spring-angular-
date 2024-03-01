package com.example.backend.controller;

import com.example.backend.entities.Tutorial;
import com.example.backend.service.TutorialService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v0")
@RequiredArgsConstructor
public class TutorialController {
    private final TutorialService tutorialService;

    @GetMapping()
    public ResponseEntity<Page<Tutorial>> getAllTutorials(Pageable pageable) {
        // Todo add request param
        Page<Tutorial> tutorialsPage = tutorialService.getAllTutorials(pageable);
        if (tutorialsPage.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(tutorialsPage);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutorial> getTutorialById(@PathVariable Long id) {
        Optional<Tutorial> tutorialOptional = tutorialService.getTutorialById(id);
        return tutorialOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<Tutorial> createTutorial(@RequestBody Tutorial tutorial) {
        Tutorial createdTutorial = tutorialService.createTutorial(tutorial);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTutorial);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutorial> updateTutorial(
            @PathVariable Long id,
            @RequestBody Tutorial tutorial) {
        Tutorial updatedTutorial = tutorialService.updateTutorial(id, tutorial);
        return updatedTutorial != null
                ? ResponseEntity.ok(updatedTutorial)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllTutorial() {
        tutorialService.deleteAllTutorial();
        return ResponseEntity.noContent().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTutorial(@PathVariable Long id) {
        tutorialService.deleteTutorial(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/titles")
    public List<Tutorial> getPublishedTutorials(String title) {
        return tutorialService.findByTitle(title);
    }
    @GetMapping("/titlesPage")
    public Page<Tutorial> getUsersByContainingName(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        return tutorialService.findBytitlePage(name,page,size);    }


}
