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
import com.vaadin.forms.orders.entities.OrderLine;
import com.vaadin.forms.orders.entities.Product;

@Service
public class BackendService {

    private static List<Order> orders;
    private static List<Customer> customers;
    private static List<Product> products;
    private static List<Location> locations;
    public static long idLine = 0L;
    static {
        long id = 0L;
        Random r = new Random();
        //, r.nextInt(4) + 1
        products = new ArrayList<>(Arrays.asList(
                new Product(id++, "Chipotle peppers", r.nextInt(39) + 10),
                new Product(id++, "Cabbage", r.nextInt(39) + 10),
                new Product(id++, "Lemon juice", r.nextInt(39) + 10),
                new Product(id++, "Capers", r.nextInt(39) + 10),
                new Product(id++, "Mackerel", r.nextInt(39) + 10),
                new Product(id++, "Garlic powder", r.nextInt(39) + 10),
                new Product(id++, "Buttermilk", r.nextInt(39) + 10),
                new Product(id++, "Powdered sugar", r.nextInt(39) + 10),
                new Product(id++, "Arugula", r.nextInt(39) + 10),
                new Product(id++, "Red pepper flakes", r.nextInt(39) + 10),
                new Product(id++, "Coconut oil", r.nextInt(39) + 10),
                new Product(id++, "Sherry", r.nextInt(39) + 10),
                new Product(id++, "Vegemite", r.nextInt(39) + 10),
                new Product(id++, "Moo shu wrappers", r.nextInt(39) + 10),
                new Product(id++, "Rhubarb", r.nextInt(39) + 10),
                new Product(id++, "Tabasco sauce", r.nextInt(39) + 10),
                new Product(id++, "Chestnuts", r.nextInt(39) + 10),
                new Product(id++, "Cream of tartar", r.nextInt(39) + 10),
                new Product(id++, "Coffee", r.nextInt(39) + 10),
                new Product(id++, "Rose water", r.nextInt(39) + 10),
                new Product(id++, "Bean sprouts", r.nextInt(39) + 10),
                new Product(id++, "Beef", r.nextInt(39) + 10),
                new Product(id++, "Cilantro", r.nextInt(39) + 10),
                new Product(id++, "Veal", r.nextInt(39) + 10),
                new Product(id++, "Crabs", r.nextInt(39) + 10),
                new Product(id++, "Croutons", r.nextInt(39) + 10),
                new Product(id++, "Irish cream liqueur", r.nextInt(39) + 10),
                new Product(id++, "Flax seed", r.nextInt(39) + 10),
                new Product(id++, "Okra", r.nextInt(39) + 10),
                new Product(id++, "Cauliflower", r.nextInt(39) + 10),
                new Product(id++, "Halibut", r.nextInt(39) + 10),
                new Product(id++, "Vermouth", r.nextInt(39) + 10),
                new Product(id++, "Black-eyed peas", r.nextInt(39) + 10),
                new Product(id++, "Canadian bacon", r.nextInt(39) + 10),
                new Product(id++, "Graham crackers", r.nextInt(39) + 10),
                new Product(id++, "Chile peppers", r.nextInt(39) + 10),
                new Product(id++, "Sushi", r.nextInt(39) + 10),
                new Product(id++, "Wasabi", r.nextInt(39) + 10),
                new Product(id++, "Allspice", r.nextInt(39) + 10),
                new Product(id++, "Honey", r.nextInt(39) + 10),
                new Product(id++, "Raw sugar", r.nextInt(39) + 10),
                new Product(id++, "Condensed milk", r.nextInt(39) + 10),
                new Product(id++, "Cod", r.nextInt(39) + 10),
                new Product(id++, "Havarti cheese", r.nextInt(39) + 10),
                new Product(id++, "Dried leeks", r.nextInt(39) + 10),
                new Product(id++, "Cornstarch", r.nextInt(39) + 10),
                new Product(id++, "Parsnips", r.nextInt(39) + 10),
                new Product(id++, "Baking soda", r.nextInt(39) + 10)));

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


        Supplier<List<OrderLine>> s = () -> r
                .ints(r.nextInt(3) + 1, 0, products.size())
                .mapToObj(i -> new OrderLine(idLine++, products.get(i), r.nextInt(4) + 1, "")).collect(Collectors.toList());

        id = 0L;
        orders = new ArrayList<>();
        for (Customer c : customers) {
            orders.add(new Order(id++, c,
                    locations.get(r.nextInt(locations.size())), LocalDate.now(),
                    LocalTime.of(r.nextInt(16) + 6, 0, 0), s.get()));
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
