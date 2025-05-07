package com.elgrupocinco.GruppUppgift05.security;

import com.elgrupocinco.GruppUppgift05.service.HumanService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private HumanService humanService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(HttpMethod.POST, "/api/humans/create").permitAll()
                                //.requestMatchers(HttpMethod.POST, "/api/humans/admin/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/humans/login!").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/animals/see-all").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/animals/filter").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/bookings").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/bookings").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/bookings/**").authenticated()
                                .requestMatchers(HttpMethod.POST, "/adoption/register").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/adoption/delete").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/adoption/search-user").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/adoption/search-animal").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/adoption/search-date").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/adoption/update").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/animals/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/animals").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/bookings/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/comment/human").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/comment/animal").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/comment/booking").authenticated()
                                .requestMatchers(HttpMethod.POST, "/comment/adoption").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/comment/human").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/comment/animal").permitAll()
                                .requestMatchers(HttpMethod.GET, "/comment/booking").authenticated()
                                .requestMatchers(HttpMethod.GET, "/comment/adoption").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/comment/**").authenticated()
                                .requestMatchers(HttpMethod.DELETE, "/comment/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/human/").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/humans/show-loggedin").authenticated()
                                .requestMatchers(HttpMethod.DELETE, "/api/humans/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/humans/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/humans/search/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/humans/cannot-adopt/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/humans/can-adopt/**").hasRole("ADMIN")

                )
                .addFilterBefore(new JWTFilter(humanService), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return httpSecurity.build();
    }

    /**
     * sets up the CORS configuration source (through Spring) to allow requests from the 127 http address
     * a new corsconfiguration is created
     * only requests from the http are allowed
     * all methods are permited
     * and allowed headers allows all header requests
     * allow credentials allows cookies to be sent
     *
     * UrlBasedCorsConfigurationSource applies the rule set above
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://127.0.0.1:5500", "http://localhost:5500"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return urlBasedCorsConfigurationSource;
    }
}
