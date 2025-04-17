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

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private HumanService humanService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(HttpMethod.POST, "/api/humans/create").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/humans/admin/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/humans/login!").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/animals/see-all").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/animals/filter").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/bookings").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/bookings").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/bookings/**").authenticated()
                                .anyRequest().hasRole("ADMIN"))
                .addFilterBefore(new JWTFilter(humanService), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return httpSecurity.build();
    }
}
