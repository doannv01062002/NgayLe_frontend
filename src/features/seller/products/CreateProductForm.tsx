"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  productService,
  ProductCreateRequest,
} from "@/services/productService";
import { categoryService, Category } from "@/services/categoryService";
import { useToast } from "@/context/ToastContext";
import { uploadService } from "@/services/uploadService";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for ReactQuill to avoid SSR issues
// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    return ({ forwardingRef, ...props }: any) => (
      <RQ ref={forwardingRef} {...props} />
    );
  },
  { ssr: false }
);

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

const TARGET_AUDIENCES = [
  "Nam giới",
  "Nữ giới",
  "Trẻ em",
  "Người lớn tuổi",
  "Cặp đôi",
  "Gia đình",
  "Đồng nghiệp",
  "Doanh nghiệp",
  "Bạn bè",
];

const GIFT_OCCASIONS = [
  "Sinh nhật",
  "Tết Nguyên Đán",
  "Valentine (14/2)",
  "Quốc tế Phụ nữ (8/3)",
  "Phụ nữ VN (20/10)",
  "Giáng sinh",
  "Kỷ niệm",
  "Cưới hỏi",
  "Tân gia",
  "Khai trương",
  "Thăm hỏi",
  "Ngày của Mẹ",
  "Ngày của Cha",
  "Quốc tế Thiếu nhi",
];

import { Switch } from "@headlessui/react";
import clsx from "clsx";

interface VariantGroup {
  name: string;
  values: string[];
}

export function ProductForm({ productId }: { productId?: number }) {
  const router = useRouter();
  const { showToast: addToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<
    { file: File; preview: string }[]
  >([]);

  // Variants State
  const [enableVariants, setEnableVariants] = useState(false);
  const [variantGroups, setVariantGroups] = useState<VariantGroup[]>([
    { name: "", values: [] },
  ]);
  const [generatedVariants, setGeneratedVariants] = useState<any[]>([]);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ProductCreateRequest>({
    defaultValues: {
      name: "",
      description: "",
      basePrice: 0,
      stock: 0,
      imageUrls: [],
      variants: [],
      originalPrice: 0,
    } as any, // Cast to any to avoid strict type checks initially
  });

  const description = watch("description");

  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await categoryService.getAllCategories();
        setCategories(cats);

        if (productId) {
          const product = await productService.getProductById(productId);
          // Map product to form
          reset({
            name: product.name,
            description: product.description,
            basePrice: product.basePrice,
            stock: product.variants?.[0]?.stockQuantity || 0,
            targetAudience: product.targetAudience,
            giftOccasion: product.giftOccasion,
            brand: product.brand,
            origin: product.origin,
          });
          // Handle Category ID mapping:
          // Since I don't have ID in DTO, I might iterate categories to find matching slug.
          if (product.categorySlug) {
            let foundCategoryId: number | undefined;
            // Check top-level categories
            let match = cats.find((c) => c.slug === product.categorySlug);
            if (match) foundCategoryId = match.categoryId;

            // Check children of top-level categories
            if (!foundCategoryId) {
              for (const c of cats) {
                if (c.children) {
                  const childMatch = c.children.find(
                    (child) => child.slug === product.categorySlug
                  );
                  if (childMatch) {
                    foundCategoryId = childMatch.categoryId;
                    break;
                  }
                }
              }
            }
            if (foundCategoryId) {
              setValue("categoryId", foundCategoryId);
            }
          }

          setExistingImages(product.imageUrls || []);
        }
      } catch (error) {
        console.error("Failed to load data", error);
        addToast("Lỗi tải dữ liệu", "error");
      }
    };
    loadData();
  }, [productId, reset, setValue, addToast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file), // Local preview immediately
      }));
      setSelectedImages((prev) => [...prev, ...newImages]);
      // Reset input
      e.target.value = "";
    }
  };

  const removeNewImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const onSubmit = async (data: ProductCreateRequest) => {
    try {
      setSubmitting(true);

      // Upload new images only on save
      const uploadedUrls: string[] = [];
      for (const img of selectedImages) {
        try {
          const url = await uploadService.uploadImage(img.file);
          uploadedUrls.push(url);
        } catch (error) {
          console.error("Upload failed for", img.file.name, error);
          addToast(`Lỗi upload ảnh ${img.file.name}`, "error");
          setSubmitting(false); // Stop submission
          return;
        }
      }

      // Combine existing images and newly uploaded images
      const finalImageUrls = [...existingImages, ...uploadedUrls];

      const payload = {
        ...data,
        categoryId: Number(data.categoryId),
        basePrice: Number(data.basePrice),
        stock: Number(data.stock),
        originalPrice: data.originalPrice
          ? Number(data.originalPrice)
          : undefined,
        imageUrls: finalImageUrls,
      };

      console.log(
        "Submitting payload size approx:",
        JSON.stringify(payload).length
      );

      if (productId) {
        await productService.updateProduct(productId, payload);
        addToast("Cập nhật sản phẩm thành công!", "success");
      } else {
        await productService.createProduct(payload);
        addToast("Tạo sản phẩm thành công!", "success");
      }

      router.push("/seller/products");
    } catch (error: any) {
      console.error("Product Save Error:", error);
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data) ||
        error.message;
      if (error?.response?.status === 413) {
        addToast(
          "Lỗi: Ảnh hoặc nội dung quá lớn (413 Payload Too Large)",
          "error"
        );
      } else {
        addToast("Lỗi: " + msg, "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const findCategoryName = (cats: Category[], id: number): string | null => {
    for (const cat of cats) {
      if (cat.categoryId === id) return cat.name;
      if (cat.children) {
        const found = findCategoryName(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const renderCategoryListboxOptions = (cats: Category[], depth = 0): any => {
    return cats.map((cat) => (
      <React.Fragment key={cat.categoryId}>
        <ListboxOption
          key={cat.categoryId}
          value={cat.categoryId}
          className={({ focus, selected }) =>
            clsx(
              "relative cursor-default select-none py-2 pr-4 transition-colors",
              depth === 0
                ? "font-semibold text-gray-900 dark:text-gray-100"
                : "font-normal text-gray-700 dark:text-gray-300",
              focus ? "bg-blue-100 dark:bg-blue-900/30" : "",
              selected
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : ""
            )
          }
          style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
        >
          {({ selected }) => (
            <>
              <span
                className={clsx(
                  "block truncate",
                  selected ? "font-medium" : "font-normal"
                )}
              >
                {cat.name}
              </span>
              {selected ? (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600 dark:text-blue-400">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
              ) : null}
            </>
          )}
        </ListboxOption>
        {cat.children &&
          cat.children.length > 0 &&
          renderCategoryListboxOptions(cat.children, depth + 1)}
      </React.Fragment>
    ));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // --- Variant Logic ---
  useEffect(() => {
    // Re-generate variants when groups change
    if (!enableVariants) {
      // Clear variants if disabled, but check length to avoid infinite loop
      if ((getValues("variants") || []).length > 0) {
        setValue("variants", []);
        setGeneratedVariants([]);
      }
      return;
    }

    const group1 = variantGroups[0];
    const group2 = variantGroups[1];

    if (!group1 || group1.values.length === 0) {
      setGeneratedVariants([]);
      return;
    }

    const existingVars = getValues("variants") || [];
    const newVariants: any[] = [];

    group1.values.forEach((v1) => {
      if (group2 && group2.values.length > 0) {
        group2.values.forEach((v2) => {
          // Try to find existing match to preserve data
          const match = existingVars.find(
            (ev: any) =>
              ev.option1Value === v1 &&
              ev.option2Value === v2 &&
              ev.option1Name === group1.name &&
              ev.option2Name === group2.name
          );
          newVariants.push({
            option1Name: group1.name || "Nhóm 1",
            option1Value: v1,
            option2Name: group2.name || "Nhóm 2",
            option2Value: v2,
            price: match ? match.price : getValues("basePrice") || 0,
            originalPrice: match
              ? match.originalPrice
              : getValues("originalPrice") || 0,
            stockQuantity: match ? match.stockQuantity : 0,
            sku: match ? match.sku : "",
            imageUrl: match ? match.imageUrl : "",
          });
        });
      } else {
        const match = existingVars.find(
          (ev: any) => ev.option1Value === v1 && ev.option1Name === group1.name
        );
        newVariants.push({
          option1Name: group1.name || "Nhóm 1",
          option1Value: v1,
          price: match ? match.price : getValues("basePrice") || 0,
          originalPrice: match
            ? match.originalPrice
            : getValues("originalPrice") || 0,
          stockQuantity: match ? match.stockQuantity : 0,
          sku: match ? match.sku : "",
          imageUrl: match ? match.imageUrl : "",
        });
      }
    });

    // Avoid infinite loop by checking if JSON stringified value is different?
    // Or just set it. hook-form setValue usually doesn't trigger effect on itself if we depend on 'variantGroups' not 'variants'.
    // generatedVariants is for UI. variants is for submit.
    setGeneratedVariants(newVariants);
    setValue("variants", newVariants);
  }, [variantGroups, enableVariants, setValue, getValues]);

  const addVariantGroup = () => {
    if (variantGroups.length < 2) {
      setVariantGroups([...variantGroups, { name: "", values: [] }]);
    }
  };

  const removeVariantGroup = (index: number) => {
    const newGroups = [...variantGroups];
    newGroups.splice(index, 1);
    setVariantGroups(newGroups);
  };

  const updateGroupName = (index: number, name: string) => {
    const newGroups = [...variantGroups];
    newGroups[index].name = name;
    setVariantGroups(newGroups);
  };

  const addVariantValue = (groupIndex: number, value: string) => {
    if (!value.trim()) return;
    const newGroups = [...variantGroups];
    if (!newGroups[groupIndex].values.includes(value.trim())) {
      newGroups[groupIndex].values.push(value.trim());
      setVariantGroups(newGroups);
    }
  };

  const removeVariantValue = (groupIndex: number, valueIndex: number) => {
    const newGroups = [...variantGroups];
    newGroups[groupIndex].values.splice(valueIndex, 1);
    setVariantGroups(newGroups);
  };

  const handleBulkApply = (field: string, value: any) => {
    const vars = getValues("variants") || [];
    const updated = vars.map((v: any) => ({ ...v, [field]: value }));
    setValue("variants", updated);
    setGeneratedVariants(updated);
  };
  // --- End Variant Logic ---

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Left Column: General Info */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <section className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Thông tin chung
          </h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", {
                  required: "Vui lòng nhập tên sản phẩm",
                })}
                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                placeholder="Ví dụ: Giỏ quà Tết..."
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mô tả chi tiết
              </label>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={description || ""}
                  onChange={(value: string) => setValue("description", value)}
                  modules={modules}
                  className="h-64 mb-12"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Thông tin bổ sung
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thương hiệu
              </label>
              <input
                {...register("brand")}
                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                placeholder="VD: Samsung, Vinamilk..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Xuất xứ
              </label>
              <input
                {...register("origin")}
                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                placeholder="VD: Việt Nam, Hàn Quốc..."
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Đối tượng tặng quà
              </label>
              <Listbox
                value={
                  watch("targetAudience")
                    ? watch("targetAudience")
                        ?.split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    : []
                }
                onChange={(selected) => {
                  setValue("targetAudience", selected.join(", "));
                }}
                multiple
              >
                <div className="relative mt-1">
                  <ListboxButton className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-800 py-2.5 pl-3 pr-10 text-left border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm">
                    <span className="block truncate">
                      {watch("targetAudience")
                        ? watch("targetAudience")
                        : "Chọn đối tượng..."}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDown
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {TARGET_AUDIENCES.map((audience, personIdx) => (
                      <ListboxOption
                        key={personIdx}
                        className={({ focus }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            focus
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900 dark:text-gray-100"
                          }`
                        }
                        value={audience}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {audience}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
              <p className="text-xs text-gray-500 mt-1">
                Giúp gợi ý quà tặng chính xác hơn.
              </p>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dịp tặng quà
              </label>
              <Listbox
                value={
                  watch("giftOccasion")
                    ? watch("giftOccasion")
                        ?.split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    : []
                }
                onChange={(selected) => {
                  setValue("giftOccasion", selected.join(", "));
                }}
                multiple
              >
                <div className="relative mt-1">
                  <ListboxButton className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-800 py-2.5 pl-3 pr-10 text-left border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm">
                    <span className="block truncate">
                      {watch("giftOccasion")
                        ? watch("giftOccasion")
                        : "Chọn dịp tặng quà..."}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDown
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {GIFT_OCCASIONS.map((occasion, idx) => (
                      <ListboxOption
                        key={idx}
                        className={({ focus }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            focus
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900 dark:text-gray-100"
                          }`
                        }
                        value={occasion}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {occasion}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Hình ảnh sản phẩm
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* Existing Images */}
            {existingImages.map((url, index) => (
              <div
                key={`existing-${index}`}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
              >
                <img
                  src={url}
                  alt="Existing"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-xs">
                    close
                  </span>
                </button>
              </div>
            ))}

            {/* New Images */}
            {selectedImages.map((img, index) => (
              <div
                key={`new-${index}`}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
              >
                <img
                  src={img.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-xs">
                    close
                  </span>
                </button>
              </div>
            ))}
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg aspect-square hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-3xl text-gray-400">
                add_photo_alternate
              </span>
              <span className="text-xs text-gray-500 mt-1">Thêm ảnh</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Chọn nhiều ảnh. Ảnh đầu tiên sẽ là ảnh đại diện.
          </p>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Video sản phẩm (Link YouTube)
            </label>
            <input
              {...register("videoUrl")}
              placeholder="https://youtube.com/..."
              className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
            />
          </div>
        </section>

        {/* Shipping Section */}
        <section className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Vận chuyển
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cân nặng (gram)
              </label>
              <input
                type="number"
                {...register("weight")}
                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                placeholder="VD: 500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kích thước (cm) - D x R x C
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  {...register("length")}
                  className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                  placeholder="Dài"
                />
                <input
                  type="number"
                  {...register("width")}
                  className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                  placeholder="Rộng"
                />
                <input
                  type="number"
                  {...register("height")}
                  className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                  placeholder="Cao"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Pricing & Organization */}
      <div className="flex flex-col gap-6">
        <section className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Tổ chức
          </h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <Listbox
                value={watch("categoryId")}
                onChange={(val) => {
                  setValue("categoryId", val);
                  if (errors.categoryId) {
                    // trigger validation or clear error
                    // clearErrors("categoryId"); // if using hook form clearErrors
                  }
                }}
              >
                <div className="relative mt-1">
                  <ListboxButton className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-800 py-3 pl-3 pr-10 text-left border border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-gray-900 dark:text-gray-100">
                      {findCategoryName(
                        categories,
                        Number(watch("categoryId"))
                      ) || "-- Chọn danh mục --"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <span className="material-symbols-outlined text-gray-400 text-sm">
                        unfold_more
                      </span>
                    </span>
                  </ListboxButton>
                  <ListboxOptions className="absolute z-50 mt-1 max-h-80 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {renderCategoryListboxOptions(categories)}
                  </ListboxOptions>
                </div>
              </Listbox>
              {/* Hidden input for validation */}
              <input
                type="hidden"
                {...register("categoryId", {
                  required: "Vui lòng chọn danh mục",
                })}
              />
              {errors.categoryId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Giá & Kho hàng
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Phân loại hàng
              </span>
              <Switch
                checked={enableVariants}
                onChange={setEnableVariants}
                className={clsx(
                  enableVariants
                    ? "bg-primary"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                )}
              >
                <span
                  aria-hidden="true"
                  className={clsx(
                    enableVariants ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
          </div>

          {!enableVariants ? (
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Giá gốc (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("originalPrice")}
                  className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Giá bán (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("basePrice", {
                    required: !enableVariants ? "Nhập giá bán" : false,
                    min: { value: 1000, message: "Giá tối thiểu 1.000đ" },
                  })}
                  className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                />
                {errors.basePrice && !enableVariants && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.basePrice.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Số lượng trong kho <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("stock", {
                    required: !enableVariants ? "Nhập số lượng" : false,
                    min: { value: 0, message: "Không được âm" },
                  })}
                  className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                />
                {errors.stock && !enableVariants && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  SKU (Mã sản phẩm)
                </label>
                <input
                  {...register("sku")}
                  className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 p-2.5"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Box 1: Define Variants */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Nhóm phân loại
                  </h4>
                </div>

                {variantGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-6 last:mb-0 relative">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tên nhóm phân loại {groupIndex + 1}
                      </label>
                      <button
                        type="button"
                        onClick={() => removeVariantGroup(groupIndex)}
                        className="text-red-500 hover:text-red-700 text-xs flex items-center"
                      >
                        <span className="material-symbols-outlined text-sm mr-1">
                          delete
                        </span>{" "}
                        Xóa nhóm
                      </button>
                    </div>
                    <input
                      value={group.name}
                      onChange={(e) =>
                        updateGroupName(groupIndex, e.target.value)
                      }
                      placeholder="VD: Màu sắc, Kích thước"
                      className="w-full mb-3 rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 p-2 text-sm"
                    />

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phân loại (Nhấn Enter để thêm)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {group.values.map((val, vIdx) => (
                        <span
                          key={vIdx}
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {val}
                          <button
                            type="button"
                            onClick={() => removeVariantValue(groupIndex, vIdx)}
                            className="ml-2 hover:text-red-500 focus:outline-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      placeholder="Thêm phân loại (VD: Đỏ, Xanh...)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addVariantValue(groupIndex, e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                      className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 p-2 text-sm"
                    />
                  </div>
                ))}

                {variantGroups.length < 2 && (
                  <button
                    type="button"
                    onClick={addVariantGroup}
                    className="mt-2 text-primary hover:text-blue-600 text-sm flex items-center font-medium"
                  >
                    <span className="material-symbols-outlined text-lg mr-1">
                      add_circle
                    </span>
                    Thêm nhóm phân loại
                  </button>
                )}
              </div>

              {/* Box 2: Variant Table */}
              {generatedVariants.length > 0 && (
                <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase font-medium">
                      <tr>
                        <th className="px-4 py-3 min-w-[120px]">Phân loại</th>
                        <th className="px-4 py-3 min-w-[120px]">
                          Giá gốc (VNĐ)
                        </th>
                        <th className="px-4 py-3 min-w-[120px]">
                          Giá bán (VNĐ)
                        </th>
                        <th className="px-4 py-3 min-w-[100px]">Kho</th>
                        <th className="px-4 py-3 min-w-[120px]">SKU</th>
                        <th className="px-4 py-3">Ảnh</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                      {generatedVariants.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            {item.option1Value}
                            {item.option2Value ? ` - ${item.option2Value}` : ""}
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              {...register(
                                `variants.${index}.originalPrice` as any
                              )}
                              className="w-full rounded border-gray-300 text-sm p-1.5 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              {...register(`variants.${index}.price` as any, {
                                required: true,
                              })}
                              className="w-full rounded border-gray-300 text-sm p-1.5 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              {...register(
                                `variants.${index}.stockQuantity` as any,
                                { required: true }
                              )}
                              className="w-full rounded border-gray-300 text-sm p-1.5 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              {...register(`variants.${index}.sku` as any)}
                              className="w-full rounded border-gray-300 text-sm p-1.5 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600"
                              placeholder="SKU"
                            />
                          </td>
                          <td className="px-4 py-3">
                            {/* Simplified Image Upload for Variant - can expand later */}
                            <span className="text-xs text-gray-400">
                              Chưa hỗ trợ
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Bulk Edit Footer */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 items-end">
                    <div className="text-xs font-medium text-gray-500 w-full mb-1">
                      Áp dụng nhanh cho tất cả:
                    </div>
                    <div>
                      <input
                        id="bulkSalesPrice"
                        placeholder="Giá bán"
                        type="number"
                        className="w-28 rounded border-gray-300 text-xs p-1.5 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <input
                        id="bulkOriginalPrice"
                        placeholder="Giá gốc"
                        type="number"
                        className="w-28 rounded border-gray-300 text-xs p-1.5 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <input
                        id="bulkStock"
                        placeholder="Kho"
                        type="number"
                        className="w-20 rounded border-gray-300 text-xs p-1.5 dark:bg-gray-700"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const p = (
                          document.getElementById(
                            "bulkSalesPrice"
                          ) as HTMLInputElement
                        )?.value;
                        const op = (
                          document.getElementById(
                            "bulkOriginalPrice"
                          ) as HTMLInputElement
                        )?.value;
                        const s = (
                          document.getElementById(
                            "bulkStock"
                          ) as HTMLInputElement
                        )?.value;

                        if (p) handleBulkApply("price", p);
                        if (op) handleBulkApply("originalPrice", op);
                        if (s) handleBulkApply("stockQuantity", s);
                      }}
                      className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-200"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <div className="flex flex-col gap-3 mt-auto">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
          >
            {submitting && (
              <span className="material-symbols-outlined animate-spin text-sm">
                progress_activity
              </span>
            )}
            Lưu sản phẩm
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 dark:bg-transparent dark:text-white dark:border-gray-600"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </form>
  );
}
