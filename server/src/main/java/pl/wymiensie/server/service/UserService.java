package pl.wymiensie.server.service;

import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserService {
    List<User> findAll();

    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

    Optional<User> findById(UUID id);

    User saveUser(User user);

    User updateUser(User user);

    void deleteUser(UUID id);

    long getNumberOfUsers();
}
