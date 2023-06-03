package ru.grachev.university.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserInfoDetailsService();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests()
                    .requestMatchers(
                            "/api/account/register",
                            "/api/account/existsemail",
                            "/api/account/existslogin"
                    ).permitAll()
                    .requestMatchers("/api/account/**").authenticated()

                    .requestMatchers("/api/admin/**").hasAuthority("admin")

                    .requestMatchers("/api/courses/fillcourses").hasAuthority("admin")
                    .requestMatchers("/api/courses/**").hasAnyAuthority("student","teacher")

                    .requestMatchers(
                      "/api/servicesinfo",
                      "/api/appeal"
                    ).permitAll()

                    .requestMatchers("/api/student/**").hasAuthority("student")

                    .requestMatchers("/**").permitAll()
                    .and()
                .logout(logout -> logout.logoutUrl("/api/account/logout"))
                .formLogin()
                    .loginProcessingUrl("/api/account/login")
                    .successHandler((request, response, authentication) -> { })
                    .failureHandler((request, response, authentication) -> response.setStatus(400))
                    .and()
                .exceptionHandling()
                    .authenticationEntryPoint(new Http403ForbiddenEntryPoint())
                    .and()
                .cors()
                    .and()
                .csrf()
                    .disable()
                .build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        var provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

}