package com.booklibrary.service

import com.booklibrary.model.Book
import com.booklibrary.model.PdfFile
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

/**
 * Created by antonkozmirchuk on 26/03/17.
 */

@Repository
interface BookMetaRepository : CrudRepository<Book, String>

@Repository
interface PdfFileRepository : CrudRepository<PdfFile, String>