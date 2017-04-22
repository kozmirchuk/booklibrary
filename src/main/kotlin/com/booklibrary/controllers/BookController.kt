package com.booklibrary.controllers

import com.booklibrary.model.Book
import com.booklibrary.model.PdfFile
import com.booklibrary.service.BookMetaRepository
import com.booklibrary.service.PdfFileRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile


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


    @GetMapping("/{id}")
    fun findOne(@PathVariable id : String) = bookMetaRepository.findOne(id)

    @PostMapping("/{id}/file")
    fun uploadPdfFile(@PathVariable id : String, @RequestParam("file") file : MultipartFile) {

        if (pdfFileRepository.exists(id))
            throw RuntimeException("File already exists")

        pdfFileRepository.save(PdfFile(id, file.bytes))
    }

    @GetMapping("/{id}/file", produces = arrayOf("application/pdf"))
    fun getPdfFile(@PathVariable id: String) : ResponseEntity<ByteArray> = ResponseEntity.ok(pdfFileRepository.findOne(id).byteArray)


}