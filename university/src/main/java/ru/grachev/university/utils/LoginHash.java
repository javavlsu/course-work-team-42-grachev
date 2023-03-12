package ru.grachev.university.utils;

import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;

import java.util.Map;

public class LoginHash {
    public static Map<String, String> loggedUsers;

    public static void createNewLogin(String hashString) {
        String hash = Hashing.sha512().newHasher().putString(hashString, Charsets.UTF_8).hash().toString();
    }
}
