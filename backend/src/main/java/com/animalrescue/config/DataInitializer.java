package com.animalrescue.config;

import com.animalrescue.model.Animal;
import com.animalrescue.model.Shelter;
import com.animalrescue.repository.AnimalRepository;
import com.animalrescue.repository.ShelterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedDemoData(AnimalRepository animals, ShelterRepository shelters) {
        return args -> {
            if (shelters.count() == 0) {
                saveShelter(shelters, "Safe Haven", "Central Zone", 60);
                saveShelter(shelters, "Paws & Care", "North Zone", 45);
                saveShelter(shelters, "Second Chance", "East Zone", 50);
                saveShelter(shelters, "Large Animal Care", "Bypass Road", 35);
                saveShelter(shelters, "Wildlife Care", "Scheme No. 54", 25);
            }
            ensureAnimal(animals, "VA-DEMO-001", "Maya", "Dog", "Indian Pariah", 2, "Female", "Brown", "/images/animals/dogs/dog1.jpg", "Vijay Nagar", Animal.AnimalStatus.ADOPTION_READY);
            ensureAnimal(animals, "VA-DEMO-002", "Bruno", "Dog", "Indie Mix", 3, "Male", "Black & White", "/images/animals/dogs/dog2.jpg", "Palasia", Animal.AnimalStatus.ADOPTION_READY);
            ensureAnimal(animals, "VA-DEMO-003", "Luna", "Cat", "Domestic Shorthair", 1, "Female", "White", "/images/animals/cats/cat1.jpg", "Vijay Nagar", Animal.AnimalStatus.ADOPTION_READY);
            ensureAnimal(animals, "VA-DEMO-004", "Coco", "Rabbit", "Domestic Rabbit", 1, "Female", "Cream", "/images/animals/rabbits/rabbit1.jpg", "Vijay Nagar", Animal.AnimalStatus.ADOPTION_READY);
            ensureAnimal(animals, "VA-DEMO-005", "Arjun", "Dog", "Indie Mix", 4, "Male", "Tan", "/images/animals/dogs/dog3.jpg", "Rau", Animal.AnimalStatus.UNDER_TREATMENT);
        };
    }
    private void saveShelter(ShelterRepository repo, String name, String location, int capacity) { Shelter s=new Shelter(); s.setName(name); s.setLocation(location); s.setTotalCapacity(capacity); s.setCurrentOccupancy(0); repo.save(s); }
    private void ensureAnimal(AnimalRepository repo,String microchip,String name,String species,String breed,int age,String sex,String color,String image,String location,Animal.AnimalStatus status){ if(repo.findByMicrochipId(microchip).isPresent()) return; Animal a=new Animal();a.setMicrochipId(microchip);a.setName(name);a.setSpecies(species);a.setBreed(breed);a.setAgeEstimate(age);a.setSex(sex);a.setColor(color);a.setImageUrl(image);a.setRescueLocation(location);a.setStatus(status);repo.save(a);}
}
