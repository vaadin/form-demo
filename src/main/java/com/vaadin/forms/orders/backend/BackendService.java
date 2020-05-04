package com.vaadin.forms.orders.backend;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import com.vaadin.forms.orders.entities.Customer;
import com.vaadin.forms.orders.entities.Location;
import com.vaadin.forms.orders.entities.Order;
import com.vaadin.forms.orders.entities.Product;

@Service
public class BackendService {

    private static List<Order> orders;
    private static List<Customer> customers;
    private static List<Product> products;
    private static List<Location> locations;

    static {
        long id = 0L;
        Random r = new Random();
        products = new ArrayList<>(Arrays.asList(
                new Product(id++, "chipotle peppers", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "cabbage", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "lemon juice", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "capers", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "mackerel", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "garlic powder", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "buttermilk", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "powdered sugar", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "arugula", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "red pepper flakes", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "coconut oil", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "sherry", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "vegemite", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "moo shu wrappers", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "rhubarb", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "Tabasco sauce", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "chestnuts", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "cream of tartar", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "coffee", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "rose water", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "bean sprouts", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "beef", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "cilantro", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "veal", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "crabs", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "croutons", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "Irish cream liqueur", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "flax seed", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "okra", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "cauliflower", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "halibut", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "vermouth", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "black-eyed peas", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "Canadian bacon", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "graham crackers", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "chile peppers", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "sushi", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "wasabi", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "allspice", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "honey", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "raw sugar", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "condensed milk", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "cod", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "Havarti cheese", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "dried leeks", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "cornstarch", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "parsnips", r.nextInt(39) + 10, r.nextInt(4) + 1),
                new Product(id++, "baking soda", r.nextInt(39) + 10, r.nextInt(4) + 1)));

        id = 0L;
        locations = new ArrayList<>(Arrays.asList(
                new Location(id++, "factory"),
                new Location(id++, "store"),
                new Location(id++, "ship")
                ));

        id = 0L;
        customers = new ArrayList<>(Arrays.asList(
                new Customer(id++, "Rowena Leeming", "rleeming0@bbc.co.uk", "+35 012 23 45"),
                new Customer(id++, "Alvinia Delong", "adelong1@altervista.org", "+35 012 23 45"),
                new Customer(id++, "Leodora Burry", "lburry2@example.com", "+35 012 23 45"),
                new Customer(id++, "Karen Oaten", "koaten3@ihg.com", "+35 012 23 45"),
                new Customer(id++, "Mariele Huke", "mhuke4@washingtonpost.com", "+35 012 23 45"),
                new Customer(id++, "Grata Widdowes", "gwiddowes5@cargocollective.com", "+35 012 23 45"),
                new Customer(id++, "Donna Roadknight", "droadknight6@apache.org", "+35 012 23 45"),
                new Customer(id++, "Tommi Nowland", "tnowland7@biblegateway.com", "+35 012 23 45"),
                new Customer(id++, "Tonya Teresia", "tteresia8@boston.com", "+35 012 23 45"),
                new Customer(id++, "Steffen Yon", "syon9@ocn.ne.jp", "+35 012 23 45"),
                new Customer(id++, "Consalve Willes", "cwillesa@linkedin.com", "+35 012 23 45"),
                new Customer(id++, "Jeanelle Lambertz", "jlambertzb@nymag.com", "+35 012 23 45"),
                new Customer(id++, "Odelia Loker", "olokerc@gov.uk", "+35 012 23 45"),
                new Customer(id++, "Briano Shawell", "bshawelld@posterous.com", "+35 012 23 45"),
                new Customer(id++, "Tarrance Mainston", "tmainstone@cmu.edu", "+35 012 23 45"),
                new Customer(id++, "Torrence Gehring", "tgehringf@a8.net", "+35 012 23 45"),
                new Customer(id++, "Augie Pionter", "apionterg@ehow.com", "+35 012 23 45"),
                new Customer(id++, "Marillin Aveson", "mavesonh@shop-pro.jp", "+35 012 23 45"),
                new Customer(id++, "Jacquelyn Moreby", "jmorebyi@slashdot.org", "+35 012 23 45"),
                new Customer(id++, "Glenn Bangley", "gbangleyj@prlog.org", "+35 012 23 45"),
                new Customer(id++, "Isidoro Glave", "iglavek@tamu.edu", "+35 012 23 45"),
                new Customer(id++, "Cchaddie Spatarul", "cspatarull@sun.com", "+35 012 23 45")));

        Supplier<List<Product>> s = () -> r
                .ints(r.nextInt(2) + 1, 0, products.size())
                .mapToObj(i -> products.get(i)).collect(Collectors.toList());


        id = 0L;
        orders = new ArrayList<>();
        for (Customer c : customers) {
            orders.add(new Order(id++, c,
                    locations.get(r.nextInt(locations.size())), LocalDate.now(),
                    LocalTime.now().truncatedTo(ChronoUnit.HOURS), s.get()));
        }
    }

    public List<Order> getOrders() {
        return orders;
    }

    public List<String> getLocations() {
        return locations.stream().map(Location::getDescription).collect(Collectors.toList());
    }

    public List<LocalTime> getTimes() {
        return IntStream.rangeClosed(6, 22)
                .mapToObj(
                        i -> LocalTime.of(i, 0).truncatedTo(ChronoUnit.MINUTES))
                .collect(Collectors.toList());
    }

    public List<Product> getProducts() {
        return products;
    }

    public List<Customer> getCustomers() {
        return customers;
    }

}
