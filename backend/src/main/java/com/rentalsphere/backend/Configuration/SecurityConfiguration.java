package com.rentalsphere.backend.Configuration;

import com.rentalsphere.backend.Enums.Roles;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth->auth
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/admin/**").hasRole(Roles.ADMIN.name())
                        .requestMatchers("/api/v1/property/register").hasAnyRole(Roles.USER.name(), Roles.PROPERTY_MANAGER.name())
                        .requestMatchers("/api/v1/property/**").hasRole(Roles.PROPERTY_MANAGER.name())
                        .requestMatchers("/api/v1/tenantapplications/property/**").hasRole(Roles.PROPERTY_MANAGER.name())
                        .requestMatchers("/api/v1/violationlog/tenant/**").hasRole(Roles.TENANT.name())
                        .requestMatchers("/api/v1/violationlog/**").hasRole(Roles.PROPERTY_MANAGER.name())
                        .requestMatchers("/api/v1/announcements/tenant/**").hasRole(Roles.TENANT.name())
                        .requestMatchers("/api/v1/announcements/**").hasRole(Roles.PROPERTY_MANAGER.name())
                        .requestMatchers("/api/v1/lease/tenant/**").hasRole(Roles.TENANT.name())
                        .requestMatchers("/api/v1/lease/**").hasRole(Roles.PROPERTY_MANAGER.name())
                        .requestMatchers("/api/v1/marketplace/post/**").hasRole(Roles.TENANT.name())
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}
