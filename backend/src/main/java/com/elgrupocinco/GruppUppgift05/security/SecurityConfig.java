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
                                .requestMatchers(HttpMethod.POST, "/api/humans/admin/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/humans/login!").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/animals/see-all").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/animals/filter").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/humans/show-loggedin").authenticated()
                                .requestMatchers(HttpMethod.POST, "/api/bookings").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/bookings").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/bookings/**").authenticated()
                                .anyRequest().hasRole("ADMIN"))
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
