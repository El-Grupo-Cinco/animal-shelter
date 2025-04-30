package com. elgrupocinco. GruppUppgift05.service;
import com.elgrupocinco.GruppUppgift05.dto.HumanDTO;
import com.elgrupocinco.GruppUppgift05.dto.HumanDTOWithPassword;
import com.elgrupocinco.GruppUppgift05.models.*;
import com.elgrupocinco.GruppUppgift05.repository.BookingRepository;
import com.elgrupocinco.GruppUppgift05.repository.CommentRepository;
import com.elgrupocinco.GruppUppgift05.repository.HumanRepository;
import com.elgrupocinco.GruppUppgift05.security.JWTService;
import com.elgrupocinco.GruppUppgift05.security.PasswordConfig;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class HumanService {

    private final HumanRepository humanRepository;
    private final PasswordConfig passwordConfig;
    private final JWTService jwtService;

    private final BookingService bookingService;
    private final BookingRepository bookingRepository;
    private final CommentRepository commentRepository;

    public HumanDTO createUser(HumanDTOWithPassword humanDTO) {
        if (!isValidEmail(humanDTO.getEmail())) {
            throw new IllegalArgumentException("Email format is not valid.");
        }

        if (!isValidPhoneNumber(humanDTO.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number format is not valid.");
        }

        Human human = new Human(
                UUID.randomUUID(),
                humanDTO.getUsername(),
                humanDTO.getFirstName(),
                humanDTO.getLastName(),
                humanDTO.getDateOfBirth(),
                humanDTO.getEmail(),
                humanDTO.getPhoneNumber(),
                humanDTO.getStreet(),
                humanDTO.getCity(),
                humanDTO.getState(),
                humanDTO.getZipCode(),
                humanDTO.isCanAdopt(),
                humanDTO.getComments(),
                "user"
        );
        human.setPassword(passwordConfig.passwordEncoder().encode(humanDTO.getPassword())); // Assuming the Human class has a setPassword method
        humanRepository.save(human);
        return HumanDTO.fromHuman(human);
    }

    public HumanDTO createAdmin(HumanDTOWithPassword humanDTO, String secretString) throws IllegalAccessException, IOException {
        if (!secretString.equals(getSecretString())) {
            throw new IllegalAccessException ("You are not allowed to register an admin account.");
        }

        Human human = new Human(
                UUID.randomUUID(),
                humanDTO.getUsername(),
                humanDTO.getFirstName(),
                humanDTO.getLastName(),
                humanDTO.getDateOfBirth(),
                humanDTO.getEmail(),
                humanDTO.getPhoneNumber(),
                humanDTO.getStreet(),
                humanDTO.getCity(),
                humanDTO.getState(),
                humanDTO.getZipCode(),
                humanDTO.isCanAdopt(),
                humanDTO.getComments(),
                "admin"
        );
        human.setPassword(passwordConfig.passwordEncoder().encode(humanDTO.getPassword())); // Assuming the Human class has a setPassword method
        humanRepository.save(human);
        return HumanDTO.fromHuman(human);
    }

    public String login(String username, String password) {
        Human human = humanRepository.findByUsername(username).orElseThrow();
        if (human == null || !passwordConfig.passwordEncoder().matches(password, human.getPassword())) {
            throw new IllegalArgumentException("User or password not valid.");
        }
        return jwtService.generateToken(human.getUserId());
    }

    // Updated deleteUser method to delete bookings associated with the user
    public String deleteUser(UUID humanId) {
        Human human = humanRepository.findById(humanId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        // Delete comments associated with the user
        Collection<Comment> comments = commentRepository.findByUserId(human.getUserId()).orElse(null);
        if (comments != null) {
            for (Comment comment : comments) {
                commentRepository.delete(comment);
            }
        }
        // Delete bookings associated with the user
        List<Booking> userBookings = bookingRepository.findByUser_UserId(humanId);
        for (Booking booking : userBookings) {
            bookingService.deleteBooking(booking.getBookingId()); // Delete each booking
        }

        humanRepository.delete(human); // Now delete the user
        return "User deleted";
    }

    public Optional<Human> verifyAuthentication(String token) {
        try {
            UUID humanID = jwtService.verifyToken(token);
            return humanRepository.findById(humanID);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    // Search humans by username, email, or full name
    public List<HumanDTO> searchHumans(String query) {
        List<Human> humans = humanRepository.searchHumans(query);
        return humans.stream()
                .map(HumanDTO::fromHuman)
                .collect(Collectors.toList());
    }

    public HumanDTO makeUserCannotAdopt(UUID userID) {
        Human human = humanRepository.findById(userID).orElseThrow(() -> new UsernameNotFoundException("User not found."));
        human.setCanAdopt(false);
        humanRepository.save(human);
        return HumanDTO.fromHuman(human);
    }

    public HumanDTO makeUserCanAdopt(UUID userID) {
        Human human = humanRepository.findById(userID).orElseThrow(() -> new UsernameNotFoundException("User not found."));
        human.setCanAdopt(true);
        humanRepository.save(human);
        return HumanDTO.fromHuman(human);
    }

    public String getSecretString() throws IOException {
        File file = new File("./src/main/resources/adminsecretstring.txt");

        try (FileReader fileReader = new FileReader(file.getAbsolutePath());
             BufferedReader reader = new BufferedReader(fileReader)) {
            return reader.readLine();
        } catch (IOException e) {
            throw new IOException("Unable to fetch secret file.");
        }
    }

    // Validation methods
    public static boolean isValidEmail(String email) {
        String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^.-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$";
        return Pattern.matches(emailRegex, email);
    }

    public static boolean isValidPhoneNumber(String phoneNumber) {
        String phoneRegex = "^\\+?[0-9]{10,15}$";
        return Pattern.matches(phoneRegex, phoneNumber);
    }
}