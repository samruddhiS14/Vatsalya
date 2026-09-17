package com.animalrescue.config;

import com.animalrescue.model.Animal;
import com.animalrescue.model.Shelter;
import com.animalrescue.repository.AnimalRepository;
import com.animalrescue.repository.ShelterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedDemoData(AnimalRepository animals, ShelterRepository shelters) {
        return args -> {
            Shelter safeHaven = findOrCreate(shelters, "Safe Haven", "Central Zone", 60);
            Shelter pawsCare = findOrCreate(shelters, "Paws & Care", "North Zone", 45);
            findOrCreate(shelters, "Second Chance", "East Zone", 50);
            findOrCreate(shelters, "Large Animal Care", "Bypass Road", 35);
            findOrCreate(shelters, "Wildlife Care", "Scheme No. 54", 25);

            ensureAnimal(animals, "VA-DEMO-001", "Maya", "Dog", "Indian Pariah", 2, "Female", "Brown", "/images/animals/dogs/dog1.jpg", "Vijay Nagar", Animal.AnimalStatus.ADOPTION_READY);
            ensureAnimal(animals, "VA-DEMO-002", "Bruno", "Dog", "Indie Mix", 3, "Male", "Black & White", "/images/animals/dogs/dog2.jpg", "Palasia", Animal.AnimalStatus.ADOPTION_READY);
            ensureAnimal(animals, "VA-DEMO-003", "Luna", "Cat", "Domestic Shorthair", 1, "Female", "White", "/images/animals/cats/cat1.jpg", "Vijay Nagar", Animal.AnimalStatus.ADOPTION_READY);
            ensureAnimal(animals, "VA-DEMO-004", "Coco", "Rabbit", "Domestic Rabbit", 1, "Female", "Cream", "/images/animals/rabbits/rabbit1.jpg", "Vijay Nagar", Animal.AnimalStatus.ADOPTION_READY);
            ensureAnimal(animals, "VA-DEMO-005", "Arjun", "Dog", "Indie Mix", 4, "Male", "Tan", "/images/animals/dogs/dog3.jpg", "Rau", Animal.AnimalStatus.UNDER_TREATMENT);

            assignIfEmpty(animals, "VA-DEMO-001", safeHaven.getId());
            assignIfEmpty(animals, "VA-DEMO-002", safeHaven.getId());
            assignIfEmpty(animals, "VA-DEMO-003", pawsCare.getId());
            assignIfEmpty(animals, "VA-DEMO-004", pawsCare.getId());

            recalculateOccupancy(animals, shelters.findAll(), shelters);
        };
    }

    private Shelter findOrCreate(ShelterRepository repo, String name, String location, int capacity) {
        return repo.findAll().stream()
                .filter(s -> s.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseGet(() -> {
                    Shelter shelter = new Shelter();
                    shelter.setName(name);
                    shelter.setLocation(location);
                    shelter.setTotalCapacity(capacity);
                    shelter.setCurrentOccupancy(0);
                    return repo.save(shelter);
                });
    }

    private void ensureAnimal(AnimalRepository repo, String microchip, String name, String species, String breed, int age, String sex, String color, String image, String location, Animal.AnimalStatus status) {
        if (repo.findByMicrochipId(microchip).isPresent()) return;
        Animal animal = new Animal();
        animal.setMicrochipId(microchip);
        animal.setName(name);
        animal.setSpecies(species);
        animal.setBreed(breed);
        animal.setAgeEstimate(age);
        animal.setSex(sex);
        animal.setColor(color);
        animal.setImageUrl(image);
        animal.setRescueLocation(location);
        animal.setStatus(status);
        repo.save(animal);
    }

    private void assignIfEmpty(AnimalRepository repo, String microchip, Long shelterId) {
        repo.findByMicrochipId(microchip).ifPresent(animal -> {
            if (animal.getShelterId() == null) {
                animal.setShelterId(shelterId);
                repo.save(animal);
            }
        });
    }

    private void recalculateOccupancy(AnimalRepository animals, List<Shelter> shelters, ShelterRepository shelterRepository) {
        List<Animal> allAnimals = animals.findAll();
        for (Shelter shelter : shelters) {
            int occupancy = (int) allAnimals.stream()
                    .filter(a -> shelter.getId() != null && shelter.getId().equals(a.getShelterId()))
                    .count();
            shelter.setCurrentOccupancy(occupancy);
            shelterRepository.save(shelter);
        }
    }
}
