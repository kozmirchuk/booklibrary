package com.booklibrary.model

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document


/**
 * Created by antonkozmirchuk on 26/03/17.
 */

@Document
data class Book(val title : String, val author : String, @Id val isbn: String, val fileId : String?)

@Document
data class PdfFile(@Id var id: String, @JsonIgnore val byteArray: ByteArray)
