package com.booklibrary.controllers

import com.booklibrary.model.Book
import com.booklibrary.service.BookMetaRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

/**
 * Created by antonkozmirchuk on 26/03/17.
 */

@RestController
@RequestMapping("/books", consumes = arrayOf("application/json"), produces = arrayOf("application/json"))
class BookController (@Autowired val bookMetaRepository: BookMetaRepository) {


    @RequestMapping(method = arrayOf(RequestMethod.GET))
    fun books() = bookMetaRepository.findAll()


    @RequestMapping(method = arrayOf(RequestMethod.POST))
    fun new(@RequestBody book : Book) = bookMetaRepository.save(book)


    @RequestMapping("/{id}", method= arrayOf(RequestMethod.GET))
    fun findOne(@PathVariable id : String) = bookMetaRepository.findOne(id)

}