package com.booklibrary.controllers

import com.booklibrary.model.Book
import com.booklibrary.model.PdfFile
import com.booklibrary.service.BookMetaRepository
import com.booklibrary.service.PdfFileRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*


/**
 * Created by antonkozmirchuk on 26/03/17.
 */

@RestController
@RequestMapping("/books", produces = arrayOf("application/json"))
class BookController (@Autowired val bookMetaRepository: BookMetaRepository,
                      @Autowired val pdfFileRepository: PdfFileRepository) {


    @GetMapping
    fun books() = bookMetaRepository.findAll()


    @PostMapping(consumes = arrayOf("application/json"))
    fun new(@RequestBody book : Book) = bookMetaRepository.save(book)


    @PutMapping("/{id}", consumes = arrayOf("application/json"))
    fun updateBook(@PathVariable("id") id: String, @RequestBody book: Book) : ResponseEntity<Book> {

        if(!bookMetaRepository.exists(id))
            return ResponseEntity(HttpStatus.NOT_FOUND)

        return ResponseEntity.ok(bookMetaRepository.save(book))

    }

    @GetMapping("/{id}")
    fun findOne(@PathVariable id : String) = bookMetaRepository.findOne(id)

    @DeleteMapping("/{id}")
    fun deleteBook(@PathVariable id : String) {
        val book = bookMetaRepository.findOne(id)
        pdfFileRepository.delete(book.fileId)
        bookMetaRepository.delete(book)
    }


    @PostMapping("/files")
    fun uploadPdfFile(@RequestParam("file") file : MultipartFile) : PdfFile {

        val id = UUID.randomUUID().toString()

        return pdfFileRepository.save(PdfFile(id, file.bytes))

    }

    @GetMapping("/files/{id}", produces = arrayOf("application/pdf"))
    fun getPdfFile(@PathVariable id: String) : ResponseEntity<ByteArray> =
            ResponseEntity.ok(pdfFileRepository.findOne(id).byteArray)


}