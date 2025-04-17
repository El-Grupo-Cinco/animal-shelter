package com.elgrupocinco.GruppUppgift05.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Component
@Data
public class JWTService {
    private final String secretString;
    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    public JWTService() {
        this.secretString = getSecretWord();
        this.algorithm = Algorithm.HMAC256(secretString);
        this.verifier = JWT.require(algorithm)
                .withIssuer("auth0")
                .build();
    }

    /**
     * generates token to be used by API, validity set for 1 hour (60 minutes)
     * refers to isuer, user ID and expiration date/time.
     * @param humanID
     * @return token
     */
    public String generateToken(UUID humanID) {
        return JWT.create()
                .withIssuer("auth0")
                .withSubject(String.valueOf(humanID))
                //.withExpiresAt(Instant.now().plus(60, ChronoUnit.MINUTES)) REMOVED SINCE IT'S A PAIN WHEN TESTING AND DEMONSTRATING (would be there for production)
                .sign(algorithm);
    }

    public UUID verifyToken(String token) {
        DecodedJWT decodedJWT = verifier.verify(token);
        String iDString = decodedJWT.getSubject();
        return UUID.fromString(iDString);
    }

    /**
     * fetch the secret phrase in txt file that normally should not be shared (shared this time for
     * the purpose of this course)
     * @return secretWord (to be set in constuctor)
     */
    public String getSecretWord() {
        File file = new File("./src/main/resources/secretfile.txt");

        try (FileReader fileReader = new FileReader(file.getAbsolutePath());
             BufferedReader reader = new BufferedReader(fileReader)) {
            return reader.readLine();
        } catch (IOException e) {
            return null;
        }
    }
}
