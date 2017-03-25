package com.booklibrary

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

/**
 * Created by antonkozmirchuk on 25/03/17.
 */

@SpringBootApplication
open class BookLibraryApplication {}

fun main(args: Array<String>) {
    SpringApplication.run(BookLibraryApplication::class.java)
}