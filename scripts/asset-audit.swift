#!/usr/bin/env swift

import AppKit
import Foundation
import Vision

guard CommandLine.arguments.count > 1 else {
  fputs("usage: asset-audit.swift IMAGE...\n", stderr)
  exit(2)
}

for path in CommandLine.arguments.dropFirst() {
  let url = URL(fileURLWithPath: path)
  guard
    let image = NSImage(contentsOf: url),
    let data = image.tiffRepresentation,
    let bitmap = NSBitmapImageRep(data: data),
    let cgImage = bitmap.cgImage
  else {
    print("\(path)\tERROR\tunreadable")
    continue
  }

  let request = VNRecognizeTextRequest()
  request.recognitionLevel = .accurate
  request.usesLanguageCorrection = false
  request.minimumTextHeight = 0.015

  do {
    try VNImageRequestHandler(cgImage: cgImage).perform([request])
    let text = (request.results ?? [])
      .compactMap { $0.topCandidates(1).first?.string }
      .joined(separator: " | ")
      .replacingOccurrences(of: "\t", with: " ")
      .replacingOccurrences(of: "\n", with: " ")
    print("\(path)\tOK\t\(text)")
  } catch {
    print("\(path)\tERROR\t\(error.localizedDescription)")
  }
}
