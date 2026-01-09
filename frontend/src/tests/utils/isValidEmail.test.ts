import { describe, it, expect } from "vitest";
import { isValidEmail } from "../../utils/isValidEmail";

describe("isValidEmail", () => {
  it("should return true for valid emails", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name@domain.co")).toBe(true);
    expect(isValidEmail("user_name@domain.com")).toBe(true);
    expect(isValidEmail("user.name123@domain.io")).toBe(true);
  });

  it('should return false for emails without "@"', () => {
    expect(isValidEmail("testexample.com")).toBe(false);
    expect(isValidEmail("user.name.domain.com")).toBe(false);
  });

  it("should return false for emails without domain", () => {
    expect(isValidEmail("test@")).toBe(false);
    expect(isValidEmail("test@.com")).toBe(false);
  });

  it("should return false for emails with invalid TLD", () => {
    expect(isValidEmail("test@example.c")).toBe(false);
    expect(isValidEmail("test@example.")).toBe(false);
  });

  it("should return false for emails with invalid characters", () => {
    expect(isValidEmail("test@exa mple.com")).toBe(false);
    expect(isValidEmail("test@exam!ple.com")).toBe(false);
    expect(isValidEmail("test@exam#ple.com")).toBe(false);
  });

  it("should return false for empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });
});
