package com.booklibrary.controllers

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by antonkozmirchuk on 25/03/17.
 */

@RestController
open class HelloWorld {

    @RequestMapping("/hello")
    fun hello() = "Hello World!"


}