package ru.grachev.university.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.grachev.university.repository.AccountRepository;

@Component
public class UserInfoDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        var user = accountRepository.findFirstByLogin(login);
        if (user == null){
            throw new UsernameNotFoundException("User with login " + login + " is not found.");
        }
        return new UserInfoDetails(user);
    }
}
