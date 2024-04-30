﻿// <auto-generated />
using System;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LIBRARYMANAGEMENT.Server.Migrations
{
    [DbContext(typeof(LibraryManagementContext))]
    partial class LibraryManagementContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Action", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ActionName")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("Id");

                    b.ToTable("Actions");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Author", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AuthorName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("CreatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("UpdatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UserId1")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("UpdatedBy");

                    b.HasIndex("UserId");

                    b.HasIndex("UserId1");

                    b.ToTable("Authors");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.AuthorBook", b =>
                {
                    b.Property<Guid>("BookId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AuthorId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("BookId", "AuthorId");

                    b.HasIndex("AuthorId");

                    b.ToTable("AuthorBooks");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Book", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ISBN")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UserId1")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("UpdatedBy");

                    b.HasIndex("UserId");

                    b.HasIndex("UserId1");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.BookIssue", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BookQrMappingId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("IssueDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("IssueTo")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("ReceiveDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("UpdatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("BookQrMappingId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("IssueTo");

                    b.HasIndex("UpdatedBy");

                    b.ToTable("BookIssues");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.BookQrMapping", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BookId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("QRNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("StatusId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("UpdatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("StatusId");

                    b.HasIndex("UpdatedBy");

                    b.ToTable("BookQrMappings");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Comment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ActionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("BookIssueId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BookQrMappingId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("ActionId");

                    b.HasIndex("BookIssueId");

                    b.HasIndex("BookQrMappingId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("UpdatedBy");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Rating", b =>
                {
                    b.Property<Guid>("BookId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Points")
                        .HasColumnType("real");

                    b.Property<DateTime>("UpdatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("BookId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("UpdatedBy");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("RoleName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Status", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("StatusName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("FirstName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("LastName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("UpdatedAtUTC")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Username")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("RoleId");

                    b.HasIndex("UpdatedBy");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Author", b =>
                {
                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "UpdatedByUser")
                        .WithMany()
                        .HasForeignKey("UpdatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", null)
                        .WithMany("CreatedAuthors")
                        .HasForeignKey("UserId");

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", null)
                        .WithMany("UpdatedAuthors")
                        .HasForeignKey("UserId1");

                    b.Navigation("CreatedByUser");

                    b.Navigation("UpdatedByUser");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.AuthorBook", b =>
                {
                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.Author", "Author")
                        .WithMany("AuthorBooks")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.Book", "Book")
                        .WithMany("AuthorBooks")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Book");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Book", b =>
                {
                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "UpdatedByUser")
                        .WithMany()
                        .HasForeignKey("UpdatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", null)
                        .WithMany("CreatedBooks")
                        .HasForeignKey("UserId");

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", null)
                        .WithMany("UpdatedBooks")
                        .HasForeignKey("UserId1");

                    b.Navigation("CreatedByUser");

                    b.Navigation("UpdatedByUser");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.BookIssue", b =>
                {
                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.BookQrMapping", "BookQrMapping")
                        .WithMany("BookIssues")
                        .HasForeignKey("BookQrMappingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("IssueTo")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "UpdatedByUser")
                        .WithMany()
                        .HasForeignKey("UpdatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BookQrMapping");

                    b.Navigation("CreatedByUser");

                    b.Navigation("UpdatedByUser");

                    b.Navigation("User");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.BookQrMapping", b =>
                {
                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.Book", "Book")
                        .WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.Status", "Status")
                        .WithMany("BookQrMappings")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "UpdatedByUser")
                        .WithMany()
                        .HasForeignKey("UpdatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("CreatedByUser");

                    b.Navigation("Status");

                    b.Navigation("UpdatedByUser");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Comment", b =>
                {
                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.Action", "Action")
                        .WithMany("Comments")
                        .HasForeignKey("ActionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.BookIssue", null)
                        .WithMany("Comments")
                        .HasForeignKey("BookIssueId");

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.BookQrMapping", "BookQrMapping")
                        .WithMany("Comments")
                        .HasForeignKey("BookQrMappingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "UpdatedByUser")
                        .WithMany()
                        .HasForeignKey("UpdatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Action");

                    b.Navigation("BookQrMapping");

                    b.Navigation("CreatedByUser");

                    b.Navigation("UpdatedByUser");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Rating", b =>
                {
                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.Book", "Book")
                        .WithMany("Ratings")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "UpdatedByUser")
                        .WithMany()
                        .HasForeignKey("UpdatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("CreatedByUser");

                    b.Navigation("UpdatedByUser");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.User", b =>
                {
                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIBRARY_MANAGEMENT.Server.Models.User", "UpdatedByUser")
                        .WithMany()
                        .HasForeignKey("UpdatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedByUser");

                    b.Navigation("Role");

                    b.Navigation("UpdatedByUser");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Action", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Author", b =>
                {
                    b.Navigation("AuthorBooks");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Book", b =>
                {
                    b.Navigation("AuthorBooks");

                    b.Navigation("Ratings");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.BookIssue", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.BookQrMapping", b =>
                {
                    b.Navigation("BookIssues");

                    b.Navigation("Comments");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.Status", b =>
                {
                    b.Navigation("BookQrMappings");
                });

            modelBuilder.Entity("LIBRARY_MANAGEMENT.Server.Models.User", b =>
                {
                    b.Navigation("CreatedAuthors");

                    b.Navigation("CreatedBooks");

                    b.Navigation("UpdatedAuthors");

                    b.Navigation("UpdatedBooks");
                });
#pragma warning restore 612, 618
        }
    }
}
