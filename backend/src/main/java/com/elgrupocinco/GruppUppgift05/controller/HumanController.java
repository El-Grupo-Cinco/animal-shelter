package com.elgrupocinco.GruppUppgift05.controller;


import com.elgrupocinco.GruppUppgift05.dto.HumanDTO;
import com.elgrupocinco.GruppUppgift05.dto.HumanDTOLogin;
import com.elgrupocinco.GruppUppgift05.dto.HumanDTOWithPassword;
import com.elgrupocinco.GruppUppgift05.models.Human;
import com.elgrupocinco.GruppUppgift05.service.HumanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/humans")
public class HumanController {
    private final HumanService humanService;
    public HumanController(HumanService humanService) {
        this.humanService = humanService;
    }
    private static final Logger logger = LoggerFactory.getLogger(HumanController.class);

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody HumanDTOWithPassword humanDTO) {
        logger.info("Received request to create user: {}", humanDTO.getUsername());
        try {
            logger.info("Received request to create user: {}", humanDTO.getUsername());
            return ResponseEntity.ok(humanService.createUser(humanDTO));
        } catch (Exception e) {
            logger.error("Error creating user: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Error creating user: " + e.getMessage());
        }
    }

    @PostMapping("/login!")
    public ResponseEntity<String> login(@RequestBody HumanDTOLogin humanDTOLogin) {
        try {
            return ResponseEntity.ok(humanService.login(humanDTOLogin.getUsername(), humanDTOLogin.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/show-loggedin")
    public ResponseEntity<?> showLoggedInUserInfo(@AuthenticationPrincipal Human human){
        try {
            HumanDTO humanDTO = HumanDTO.fromHuman(humanService.showInfo(human));
            return ResponseEntity.ok(humanDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Haven't written error handling for 'showLoggedInUserInfo', sorry");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable UUID id, @AuthenticationPrincipal Human human) {
        System.out.println(human.getRole());
        try {
            String result = humanService.deleteUser(id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting user: " + e.getMessage());
        }
    }

    // Search for humans by username, email, or name
    @GetMapping("/search")
    public ResponseEntity<List<HumanDTO>> searchHumans(@RequestParam String query) {
        List<HumanDTO> humans = humanService.searchHumans(query);
        return ResponseEntity.ok(humans);
    }

    @PostMapping("/admin/{secretString}")
    public ResponseEntity<?> createAdmin(@RequestBody HumanDTOWithPassword humanDTO, @PathVariable String secretString) {
        try {
            return ResponseEntity.ok(humanService.createAdmin(humanDTO, secretString));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating user: " + e.getMessage());
        }
    }

    @PutMapping("/cannot-adopt/{userID}")
    public ResponseEntity<?> makeUserCannotAdopt(@PathVariable UUID userID) {
        try {
            return ResponseEntity.ok(humanService.makeUserCannotAdopt(userID));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/can-adopt/{userID}")
    public ResponseEntity<?> makeUserCanAdopt(@PathVariable UUID userID) {
        try {
            return ResponseEntity.ok(humanService.makeUserCanAdopt(userID));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllUsers(@AuthenticationPrincipal Human human) {
        try {
            List<Human> allHumans = humanService.getAllHumans();
            List<HumanDTO> allHumanDTO = allHumans
                    .stream()
                    .map(HumanDTO::fromHuman)
                    .toList();
            return ResponseEntity.ok().body(allHumanDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
